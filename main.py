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
        weighted_articles = sorted(weighted_articles, key=lambda x: x[0])
        model = weighted_articles.pop(0)[1]
        articles = []
        for pair in weighted_articles:
            art = pair[1]
            if correlate_text(art.vector, model.vector) > 0.5:
                articles.append(pair[1])
        generated_article, sources = group_sentences(articles)
        title = ""
        if len(generated_article) > 0:
            title = create_title(generated_article[0])
        else:
            title = "Sorry, we couldn't find any related articles!"
        #generate the text and display some how
        return render_template("home.html", title=title, article=generated_article)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)


