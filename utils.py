import re
from nltk.corpus import stopwords

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
    sentences = [s.strip() for s in sentences]
    return sentences

def bag_of_words(sentence_lists):
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
    word_counts = bag_of_words(sentences)
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
