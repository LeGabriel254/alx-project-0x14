import http.client

conn = http.client.HTTPSConnection("imdb236.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "d2a4e29a6dmshf6d0ad4fabf23cep1209f8jsn44c766a4af76",
    'x-rapidapi-host': "imdb236.p.rapidapi.com"
}

conn.request("GET", "/imdb/tt7631058/cast", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))