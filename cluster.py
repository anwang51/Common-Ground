from utils import vectorize_text
from utils import correlate_text
from utils import summarize
import os
from sklearn.cluster import KMeans
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def average_relation(vectorized):
	correlation = 0
	i = 0
	num = len(vectorized)
	num_comparisons = 0
	while i < len(vectorized):
		j = i + 1
		while j < len(vectorized):
			correlation += correlate_text(vectorized[i].vector, vectorized[j].vector)
			j += 1
			num_comparisons += 1
		i += 1
	if num_comparisons == 0:
		return 1
	return correlation / num_comparisons

def cluster(vectorized):
	unique_words = set()
	for article in vectorized:
		vector = article.vector
		for key in vector:
			unique_words.add(key)

	index = 0
	attribute_vector = {}
	for entry in unique_words:
		attribute_vector[entry] = index
		index += 1

	dim = len(attribute_vector)
	processed_vectorized = []
	for article in vectorized:
		v = article.vector
		temp_vec = [0 for _ in range(dim)]
		for key in v:
			ind = attribute_vector[key]
			val = v[key]
			temp_vec[ind] = val
		processed_vectorized.append(np.asarray(temp_vec))

	processed_vectorized = np.asarray(processed_vectorized)
	# kmeans = KMeans().fit(processed_vectorized)
	kmeans = KMeans(n_clusters=(len(processed_vectorized) / 3)).fit(processed_vectorized)
	return kmeans.labels_

def common_keywords(grouping):
	unique_words = set()
	for article in grouping:
		for word in article.word_scores:
			unique_words.add(word)
	for article in grouping:
		missing = set()
		for word in unique_words:
			if word not in article.word_scores:
				missing.add(word)
		for word in missing:
			unique_words.remove(word)
	keywords = {}
	for word in unique_words:
		keywords[word] = 0
	for article in grouping:
		for word in keywords:
			keywords[word] += article.word_scores[word]
	for word in keywords:
		keywords[word] = float(keywords[word]) / len(grouping)
	return keywords

def group_sentences(grouping):
	analyzer = SentimentIntensityAnalyzer()
	sentences = []
	sources = set()
	for article in grouping:
		summarized = summarize(article.content, 15)
		processed_summarized = []
		for sentence in summarized:
			sources.add(article.source)
			processed_summarized.append((sentence, "source " + article.source))
		sentences.extend(processed_summarized)
	common = common_keywords(grouping)
	scoring = []
	for sentence in sentences:
		final_score = 0
		score = analyzer.polarity_scores(sentence[0])
		for word in common:
			if word in sentence[0]:
				final_score += abs(score["compound"] - common[word])
		scoring.append((sentence, final_score))
	scoring = sorted(scoring, key=lambda x: x[1])[0:10]
	scoring = [sentence[0] for sentence in scoring]
	final_output = []
	for sentence in sentences:
		if sentence in scoring:
			final_output.append(sentence)
	return final_output, sources
