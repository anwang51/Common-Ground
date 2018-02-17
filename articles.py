from utils import split_sentences
from utils import vectorize_text
from utils import summarize
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class Article:

	def __init__(self, content, source):
		self.content = content
		self.source = source
		self.sentences = split_sentences(content)
		self.vector = vectorize_text(content)
		self.word_scores = {}
		self.summary = summarize(self.content, 7)
		self.init_word_scores()

	def init_word_scores(self):
		for keyword in self.vector:
			self.word_scores[keyword] = 0

		analyzer = SentimentIntensityAnalyzer()
		for sentence in self.sentences:
			score = analyzer.polarity_scores(sentence)
			words = sentence.split(" ")
			for word in words:
				if word in self.word_scores:
					self.word_scores[word] += score['compound']