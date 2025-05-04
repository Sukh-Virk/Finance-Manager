# predict_next_month_spend.py

import pandas as pd
import joblib

def load_and_prepare_for_prediction(path="data/transactions_pivot.csv", max_lag=3):
    df = pd.read_csv(path, parse_dates=["month"])
    df = df.sort_values(["user_id", "month"])
    cats = [c for c in df.columns if c not in ["user_id", "month", "total_spend"]]
    targets = ["total_spend"] + cats

    # base features: current month spend + calendar
    X = df[["user_id", "month"] + targets].copy()
    X["month_num"] = X.month.dt.month
    X["quarter"]   = X.month.dt.quarter

    # lag features
    for lag in range(1, max_lag + 1):
        for col in targets:
            X[f"{col}_lag{lag}"] = (
                df.groupby("user_id")[col]
                  .shift(lag)
            )

    # drop rows with missing lag data
    X = X.dropna()

    # keep only each user’s last row (i.e. the most recent month)
    X_last = X.groupby("user_id", as_index=False).tail(1).reset_index(drop=True)

    feature_cols = [c for c in X_last.columns if c not in ["user_id", "month"]]
    return X_last, feature_cols, cats

def predict_next_month(model_path="models/spendsight_multireg.pkl",
                       data_path="data/transactions_pivot.csv"):
    X_last, feature_cols, cats = load_and_prepare_for_prediction(data_path)
    model = joblib.load(model_path)

    preds = model.predict(X_last[feature_cols])
    columns = ["total_spend"] + cats

    # assemble results
    df_out = pd.DataFrame(preds, columns=columns)
    df_out["user_id"] = X_last["user_id"].values
    # next-month is simply month + 1 period
    df_out["predicted_month"] = (
        X_last["month"] + pd.offsets.MonthBegin(1)
    ).dt.strftime("%Y-%m-%d")

    # reorder for readability
    df_out = df_out[["user_id", "predicted_month"] + columns]

    # output
    print(df_out.to_string(index=False))
    df_out.to_csv("predictions_next_month.csv", index=False)
    print("\nSaved predictions to predictions_next_month.csv")

if __name__ == "__main__":
    predict_next_month()
