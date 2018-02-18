from flask import Flask, render_template, request
import os
import requests
import json
from utils import vectorize_text
from utils import similarity
from utils import correlate_text
from cluster import group_sentences
from utils import correlate_text
from articles import Article
from utils import create_title

app = Flask(__name__)

@app.route('/', methods=["POST","GET"])
def generate_article():
    keywords = request.form.get("topic")
    if keywords == None:
        return render_template("home.html")
    else:
        keywords = keywords.split(" ")
        kwords = []
        for word in keywords:
            kwords.append(word.lower())

        articles = []
        for file in os.listdir("articles/"):
            if file.endswith(".txt"):
                text = open(os.path.join("articles/", file), "r").read()
                source = file[:file.index("-")]
                articles.append(Article(text, source))
        weighted_articles = []
        for art in articles:
            weighted_articles.append((similarity(art.vector, keywords), art))
        weighted_articles = sorted(weighted_articles, key=lambda x: -x[0])
        temp = []
        for pair in weighted_articles:
            if pair[0] > 0:
                temp.append(pair)
        weighted_articles = temp
        if len(weighted_articles) >= 3:
            model = weighted_articles[0:3]
        else:
            model = weighted_articles
        articles = []
        for pair in model:
            art = pair[1]
            articles.append(art)
        generated_article, sources = group_sentences(articles)
        title = ""
        art_text = ""
        for sentence in generated_article:
            art_text += sentence[0] + " "
        if len(generated_article) > 0:
            title = create_title(art_text)
        else:
            title = "Sorry, we couldn't find any related articles!"
        #generate the text and display some how
        title = title.encode('utf8')
        art_text = art_text.encode('utf8')
        return render_template("home.html", title=title, article=art_text)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)


