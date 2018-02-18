"""
Using RNN encoder-decoder methods to order sentences in coherent manners.
Paper: https://arxiv.org/pdf/1611.02654.pdf
"""
import gensim
w2v_model = gensim.models.KeyedVectors.load_word2vec_format('./GoogleNews-vectors-negative300.bin', binary=True)

import gensim
w2v_model = gensim.models.KeyedVectors.load_word2vec_format('./GoogleNews-vectors-negative300.bin', binary=True)
import keras
from keras.models import Model
from keras.layers import Input, LSTM, Dense, Activation
from utils import split_sentences
import tensorflow as tf
import glob
import numpy as np
import random

DATA_PATH_ = "./"
batch_size = 1
word_embed_size = 300
sentence_embed_size = 1000
latent_dim = 1000
num_it = 10000
training = False
num_epochs = 30
num_sentences = 20
word_per_sent = 50
training = True

def scoring_function(s, h, W, b):
	return tf.reduce_sum(tf.multiply(s, tf.matmul(h, W)+b))

articlez = dict()

def gather():
    path = './news_training/*/*/*.txt'   
    files=glob.glob(path)   
    for file in files:     
        f=open(file, 'r')
        articlez[file] = f.read()   
        f.close() 

def count_correct(out, truth):
    out_t = np.transpose(out)
    truth_t = np.transpose(truth)
    count = 0
    for i in range(len(out)):
        if np.argmax(out_t[i]) == np.argmax(truth_t[i]):
            count += 1
    return count

def scramble_sentences(lst):
    #returns a tuple (scrambled list, original indices)
    org_indices = random.sample(range(len(lst)), 10)
    scrambled = [lst[i] for i in org_indices]
    sorted_indices = sorted(org_indices)
    return (scrambled, [sorted_indices.index(i)+1 for i in org_indices])

def vectorize_sentence(sentence):
    words = sentence.strip().split()
    return np.array([w2v_model.wv[word] for word in words if word in w2v_model.wv.vocab])

def generate():
    sentences = split_sentences(articlez[random.choice(articlez.keys())])
    while len(sentences) <10:
        sentences = split_sentences(articlez[random.choice(articlez.keys())])
    rand_article = split_sentences(articlez[random.choice(articlez.keys())])
    while len(rand_article) < 10:
        rand_article = split_sentences(articlez[random.choice(articlez.keys())])
    rand_sentences = random.sample(rand_article,10)

    sents, indices = scramble_sentences(sentences)
    sents += rand_sentences
    
    indices += [1] + [0]*9
    vect_sents = np.array([vectorize_sentence(s) for s in sents])

    for i in range(20): #looping through each sentence
        #vect[i] is ith sentence, so len(vect[i]) is the number of words per sentence
        while len(vect_sents[i]) < word_per_sent:
            dummy_word = list(w2v_model.wv["hello"])
            temp = list(vect_sents[i])
            temp.append(dummy_word)
            vect_sents[i] = np.array(temp)
        if len(vect_sents[i]) > word_per_sent:
            vect_sents[i] =  np.array(vect_sents[i][:word_per_sent])
    
    vect_sents = np .vstack([i.reshape(1, 50, 300) for i in vect_sents])

    
    temp = np.array([[[0] for _ in indices] for i in indices])
    for i in range(len(temp)):
        temp[i][indices[i]] = [1]
    return (vect_sents, np.hstack(temp))

def train():
	# s_inputs = Input(shape=(batch_size, num_sentences,word_embed_size*50))
	s_inputs = tf.placeholder(tf.float32, shape=(batch_size, num_sentences, None, word_embed_size))
	print(s_inputs)
	sent_encoder = LSTM(sentence_embed_size, input_shape=s_inputs[0].shape[1:], return_state=True)
	s= []
	for i in range(num_sentences):
	    print(s_inputs[:,i,:,:])
	    s_inputs = tf.convert_to_tensor(s_inputs)
	#     print(s_inputs.shape)
	    lstm_output = sent_encoder(s_inputs[:,i,:,:])
	    sent_out, h_sent, c_sent = lstm_output
	    sent_states = [h_sent, c_sent]
	    s.append( sent_states[0])
	s = np.asarray(s)
	print(s.shape)
	encoder = LSTM(latent_dim, return_state=True)
	W_enc = Dense(sentence_embed_size)
	state_h = tf.zeros((batch_size, latent_dim))
	state_c = tf.zeros((batch_size, latent_dim))
	encoder_states = [state_h, state_c]
	for i in range(num_sentences):
	    e_enc = tf.convert_to_tensor([tf.reduce_sum(tf.multiply(s_i, W_enc(state_h))) for s_i in s])
	    a_enc = keras.backend.softmax(e_enc)
	    next_input = tf.convert_to_tensor(np.sum(np.array([s[i] * a_enc[i] for i in range(num_sentences)])))
	    print(next_input.get_shape())
	    encoder_outputs, state_h, state_c = encoder(tf.reshape(next_input, [batch_size, 1, sentence_embed_size]), initial_state=encoder_states)
	    encoder_states = [state_h, state_c]
	    
	# Set up the decoder, using `encoder_states` as initial state.
	# decoder_inputs = Input(shape=(None, sentence_embed_size))
	x_0 = tf.zeros((batch_size, latent_dim))
	# We set up our decoder to return full output sequences,
	# and to return internal states as well. We don't use the 
	# return states in the training model, but we will use them in inference.
	decoder_lstm = LSTM(latent_dim, return_sequences=True, return_state=True)
	W_dec = Dense(sentence_embed_size)
	decoder_outputs, h_dec, c_dec = decoder_lstm(tf.reshape(x_0, [batch_size, 1, sentence_embed_size]),
	                                     initial_state=encoder_states)

	e_dec = tf.convert_to_tensor([tf.reduce_sum(tf.multiply(s_i, W_dec(h_dec))) for s_i in s])
	a_dec = keras.backend.softmax(e_dec)

	next_input = tf.convert_to_tensor(np.sum(np.array([s[i] * a_dec[i] for i in range(num_sentences)])))

	decoder_states = [h_dec, c_dec]
	decoder_outputs= []
	for i in range(num_sentences):
	#     if(training== True):
	#         x_i = s[true_ordering[i]]
	#     else:
	    print(np.argmax(a_dec))
	    x_i = s[np.argmax(a_dec)]
	        
	    __ , h_dec, c_dec = decoder_lstm(tf.reshape(x_i, [batch_size, 1, sentence_embed_size]),
	                                     initial_state=decoder_states)
	    
	    decoder_states = [h_dec, c_dec]
	    e_dec = tf.convert_to_tensor([tf.reduce_sum(tf.multiply(s_i, W_dec(h_dec))) for s_i in s])
	    print(e_dec.get_shape())
	    a_dec = keras.backend.softmax(e_dec)
	    print(a_dec.get_shape())
	    decoder_outputs.append(a_dec)
	    next_input = tf.convert_to_tensor(np.sum(np.array([s[i] * a_dec[i] for i in range(num_sentences)])))
	    
	decoder_outputs = tf.stack(decoder_outputs)
	expected_outputs = tf.placeholder(tf.float32, shape=(batch_size, num_sentences, num_sentences))
	# W_3 = Dense(num_sentences)
	# outputs = W_3(decoder_outputs)
	# Define the model that will turn
	# `encoder_input_data` & `decoder_input_data` into `decoder_target_data`
	# model = Model(inputs=[s_inputs], outputs=tf.convert_to_tensor(outputs))
	difference = count_correct(tf.reshape(decoder_outputs, (20, 20)), tf.reshape(expected_outputs(20, 20)))
	loss = tf.reduce_mean(tf.square(tf.square(decoder_outputs - expected_outputs)))
	train_step = tf.train.AdamOptimizer(1e-2).minimize(loss)

	sess = tf.InteractiveSession()
	tf.global_variables_initializer().run()

	saver = tf.train.Saver()

	with sess.as_default():
	    for i in range(num_it):
	        print("iteration:", i)
	        batch = generate()
	        train_step.run(feed_dict={s_inputs: batch[0].reshape((1,20,50,300)), 
	                                    expected_outputs: batch[1].reshape((1,20,20))})
	        if i%5 == 0:
	            accuracy = sess.run(loss, feed_dict={s_inputs: batch[0].reshape((1,20,50,300)), 
	                                    expected_outputs: batch[1].reshape((1,20,20))})
	            print("validation: ", accuracy)
	            diff = sess.run(difference, feed_dict={s_inputs: batch[0].reshape((1,20,50,300)), 
	                                    expected_outputs: batch[1].reshape((1,20,20))})
	            print("difference: ", diff)
	        if i%20 == 19:
	            save_path = saver.save(sess, "/tmp/model.ckpt")
	            print("Model saved in path: %s" % save_path)
            
def __main__():
	if training:
		train()