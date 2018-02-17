from utils import vectorize_text
import os
from sklearn.cluster import KMeans
import numpy as np

articles = []
for file in os.listdir("articles/"):
    if file.endswith(".txt"):
        articles.append(open(os.path.join("articles/", file), "r").read())

vectorized = []
for file in articles:
	vectorized.append(vectorize_text(file))

unique_words = set()
for vector in vectorized:
	for key in vector:
		unique_words.add(key)

index = 0
attribute_vector = {}
for entry in unique_words:
	attribute_vector[entry] = index
	index += 1

dim = len(attribute_vector)
processed_vectorized = []
for v in vectorized:
	temp_vec = [0 for _ in range(dim)]
	for key in v:
		ind = attribute_vector[key]
		val = v[key]
		temp_vec[ind] = val
	processed_vectorized.append(np.asarray(temp_vec))

processed_vectorized = np.asarray(processed_vectorized)
kmeans = KMeans().fit(processed_vectorized)
kmeans.labels_