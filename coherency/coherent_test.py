import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Conv1D, MaxPooling1D, Flatten, Dropout
import keras
import os
import random
import numpy as np

INPUT_MAX = 2500
NUM_CLASSES = 2
EPOCHS = 200

AdamOptimizer = tf.train.AdamOptimizer

def training_generator():
	bbc = "bbc/"
	sports = "bbcsport/"
	sub_bbc = ["business/", "entertainment/", "politics/", "sport/", "tech/"]
	sub_sports = ["athletics/", "cricket/", "football/", "rugby/", "tennis/"]
	url = "news_training/"
	text_files = []
	for folder in sub_bbc:
		text_files.extend(extract_folder(url + bbc + folder))
	for folder in sub_sports:
		text_files.extend(extract_folder(url + sports + folder))
	return text_files

def extract_folder(folder):
	text = []
	for file in os.listdir(folder):
		if file.endswith(".txt"):
			temp = open(os.path.join(folder + file), "r").read()
			if len(temp) < 2500:
				text.append(temp)
	return text

all_files = training_generator()
num_files = len(all_files)

def process_data(data):
	x_flag = True
	x = np.array([np.array([np.array([0]) for _ in range(INPUT_MAX)])])
	# x = np.array([np.array([0 for _ in range(INPUT_MAX)])])
	y = np.array([0])
	i = 0
	for sentence in data:
		temp = np.array([0])
		sentence = list(sentence)
		first_half = sentence[: len(sentence) / 2]
		second_half = sentence[(len(sentence) / 2) + 1:]
		for ch in first_half:
			try:
				temp = np.vstack([temp, [float(ch)]])
			except ValueError:
				pass
		if random.uniform(0, 1) < 0.5:
			other = random.randint(0, len(all_files) - 1)
			while other == i:
				other = random.randint(0, len(all_files) - 1)
			for ch in data[other][len(data[other]) - (len(sentence) / 2 + 1):]:
				try:
					temp = np.vstack([temp, [float(ch)]])
				except ValueError:
					pass
			y = np.vstack([y, 0])
		else:
			for ch in second_half:
				try:
					temp = np.vstack([temp, [float(ch)]])
				except ValueError:
					pass
			y = np.vstack([y, 1])
		while len(temp) < INPUT_MAX:
			temp = np.vstack([temp, ["0"]])
		x = np.vstack([x, [temp]])
		if x_flag:
			x = np.array([x[1]])
			x_flag = False
		i += 1
	y = y[1:]
	return x, y

x, y = process_data(all_files)
NUM_SAMPLES = len(x)

model = Sequential()
model.add(Conv1D(128, 4, strides=2, padding='valid', activation='relu', input_shape=[INPUT_MAX, 1]))
model.add(MaxPooling1D(4, strides=2, padding='valid'))
model.add(Conv1D(128, 4, strides=2, padding='valid', activation='relu'))
model.add(MaxPooling1D(4, strides=2, padding='valid'))
model.add(Flatten())
model.add(Dense(2048, activation='relu'))
# model.add(Dropout(0.5))
model.add(Dense(2, activation='softmax'))
model.compile(loss=keras.losses.sparse_categorical_crossentropy, optimizer=AdamOptimizer(learning_rate=0.001), metrics=['accuracy'])

i = 0
while i < EPOCHS:
	model.fit(x, y, batch_size=32)
	if i % 20 == 0:
		model.save("coherent_models/coherency" + str(i) + ".h5")
	i += 1
	if i > 40:
		x, y = process_data(all_files)
	print("Epoch: ", i)