import requests

url = "https://jsonplaceholder.typicode.com/todos/1"

r = requests.get(url)
print("Hello...")
data = r.json()
print(data)

file1 = open("data.txt","w")

file1.write(data)
file1.close()