from utils import vectorize_text
from utils import correlate_text
import os
from sklearn.cluster import KMeans
import numpy as np

def average_relation(vectorized):
	correlation = 0
	i = 0
	num = len(vectorized)
	num_comparisons = 0
	while i < len(vectorized):
		j = i
		while j < len(vectorized):
			correlation += correlate_text(vectorized[i], vectorized[j])
			j += 1
			num_comparisons += 1
		i += 1
	return correlation / num_comparisons

def cluster(vectorized):
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
	return kmeans.labels_