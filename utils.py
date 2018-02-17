import re
from nltk.corpus import stopwords
import math
import random
import glob
import numpy as np

punctuation_pat = re.compile("[A-Z]*[a-z]*[\.\,]")

"""Following function by D Greenberg and Deduplicator from https://stackoverflow.com/questions/4576077/python-split-text-on-sentences"""
caps = "([A-Z])"
decimal_front = "([.]*[0-9]*)"
decimal_back = "([0-9]*[.]*)"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov)"

def split_sentences(text):
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    text = re.sub("\s" + caps + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(caps + "[.]" + caps + "[.]" + caps + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(caps + "[.]" + caps + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + caps + "[.]"," \\1<prd>",text)
    text = re.sub(" " + decimal_front + "[.]" + decimal_back," \\1<prd>\\2",text)
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences if s.strip()!="."]
    return sentences

def bag_of_words(text):
    sentence_lists = split_sentences(text)
    word_count = {}
    count = 0
    for line in sentence_lists:
        words = line.split(" ")
        for word in words:
            word = word.lower()
            if isPlural(word):
                word = word[:len(word)-1]
            if not (word in stopwords.words('english')) and len(word) > 0:
                count += 1
                if punctuation_pat.match(word):
                    word = word[:-1]
                if word in word_count:
                    word_count[word] += 1
                else:
                    word_count[word] = 1
    sorted_words = sorted(word_count, key=lambda x: word_count[x])
    sorted_pairs = []
    i = len(sorted_words) - 1
    while i >= 0:
        word = sorted_words[i]
        sorted_pairs.append((word, float(word_count[word]) / count))
        i -= 1
    return sorted_pairs

def isPlural(word):
    if len(word) <= 0:
        return False
    return word[-1] == "s"

def summarize(txt, num_sentences):
    sentences = split_sentences(txt)
    word_counts = bag_of_words(txt)
    word_dict = {}
    for pair in word_counts:
        word_dict[pair[0]] = pair[1]
    sentence_weighing = {}
    for sentence in sentences:
        words = sentence.split(" ")
        weight = 0
        for word in words:
            word = word.lower()
            if isPlural(word):
                word = word[:len(word) - 1]
            if word in word_dict:
                weight += word_dict[word]
        sentence_weighing[sentence] = weight
    sorted_sentences = sorted(sentence_weighing, key=lambda x: sentence_weighing[x], reverse=True)[0:num_sentences]
    s_indices = []
    for sentence in sorted_sentences:
        s_indices.append(sentences.index(sentence))
    s_indices = sorted(s_indices)
    summarized_text = []
    for i in s_indices:
        summarized_text.append(sentences[i])
    return summarized_text

def vectorize_text(text):
    words = bag_of_words(text)
    if len(words) < 20:
        diff = 20 - len(words)
        for _ in range(diff):
            words.append(("N/A", -1))
    else:
        words = words[0:20]
    sum_weight = 0
    for word in words:
        sum_weight += word[1]
    word_dict = {}
    for pair in words:
        word_dict[pair[0]] = pair[1] / sum_weight
    return word_dict

def normalize_text(v1):
    magnitude = 0
    for k in v1:
        magnitude += v1[k] * v1[k]
    magnitude = math.sqrt(magnitude)
    for k in v1:
        v1[k] = v1[k] / magnitude
    return v1

def dot_text(v1, v2):
    dot_sum = 0
    for k in v1:
        if k in v2:
            dot_sum += v1[k] * v2[k]
    return dot_sum

def correlate_text(v1, v2):
    relation = 0
    v1 = normalize_text(v1)
    v2 = normalize_text(v2)
    return dot_text(v1, v2)

def scramble_sentences(lst):
    #returns a tuple (scrambled list, original indices)
    org_indices = np.random.permutation(len(lst))
    scrambled = [lst[i] for i in org_indices]
    return (scrambled, org_indices)

# def vectorize_sentence(sentence):
#     words = sentence.strip().split()
#     return np.array([w2v_model.wv[word] for word in words])

# def verify_contents(article):

# def reorder(sentence):

# articlez = dict()

# def gather():
#     path = 'articles/*.txt'   
#     files=glob.glob(path)   
#     for file in files:     
#         f=open(file, 'r')
#         articlez[file] = f.read()   
#         f.close() 

# def generate():
#     sentences = split_sentences(articlez[random.choice(articlez.keys())])
#     sents, indices = scramble_sentences(sentences)
#     vect_sents = [vectorize_sentence(s) for s in sents]
#     return (vect_sents, indices)

# gather()
# generate()
