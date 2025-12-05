
import pandas as pd
import requests

df = pd.read_excel("Students.xlsx")
students = df.to_dict(orient='records')
res = requests.post("http://localhost:1956/students", json={"students": students})
print(res.json())
