import pandas as pd
import numpy as np
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import TimeSeriesSplit, cross_val_score
import joblib
import os

def load_and_prepare(path="transactions_pivot.csv", max_lag=3):
    df = pd.read_csv(path, parse_dates=["month"])
    df = df.sort_values(["user_id","month"])
    cats = [c for c in df.columns if c not in ["user_id","month","total_spend"]]
    targets = ["total_spend"] + cats
    for col in targets:
        df[f"{col}_tgt"] = df.groupby("user_id")[col].shift(-1)
    df = df.dropna(subset=[f"{c}_tgt" for c in targets])
    X = df[["user_id","month"] + targets].copy()
    y = df[[f"{c}_tgt" for c in targets]].copy()
    X["month_num"] = X.month.dt.month
    X["quarter"]   = X.month.dt.quarter
    for lag in range(1, max_lag+1):
        for col in targets:
            X[f"{col}_lag{lag}"] = df.groupby("user_id")[col].shift(lag)
    X = X.drop(columns=["month","user_id"]).dropna()
    y = y.loc[X.index]
    return X, y, cats

def evaluate_model(X, y, max_splits=5):
    n_samples = X.shape[0]
    n_splits  = min(max_splits, max(1, n_samples - 1))
    tscv      = TimeSeriesSplit(n_splits=n_splits)
    base      = GradientBoostingRegressor(n_estimators=200, learning_rate=0.05, max_depth=4)
    model     = MultiOutputRegressor(base)
    scores    = cross_val_score(model, X, y, cv=tscv, scoring="neg_mean_absolute_error", n_jobs=-1)
    mae       = -np.mean(scores)
    print(f"Time-Series CV MAE (splits={n_splits}): {mae:.2f}")
    return model

def train_and_save(X, y, model, out_path="spendsight_model.pkl"):
    model.fit(X, y)
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    joblib.dump(model, out_path)
    print(f"Model saved to {out_path}")

if __name__ == "__main__":
    X, y, categories = load_and_prepare("data/transactions_pivot.csv")
    model = evaluate_model(X, y)
    train_and_save(X, y, model, out_path="models/spendsight_multireg.pkl")
