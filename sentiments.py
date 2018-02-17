 

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
import six
import sys


def sentiment_file(gcs_uri):
    """Detects sentiment in the file located in Google Cloud Storage."""
    client = language.LanguageServiceClient()

    # Instantiates a plain text document.
    document = types.Document(
        gcs_content_uri=gcs_uri,
        type=enums.Document.Type.PLAIN_TEXT)

    # Detects sentiment in the document. You can also analyze HTML with:
    #   document.type == enums.Document.Type.HTML
    sentiment = client.analyze_sentiment(document).document_sentiment

    print('Score: {}'.format(sentiment.score))
    print('Magnitude: {}'.format(sentiment.magnitude))


# def entity_sentiment_gcs(gcs_uri):
#     """Detects entity sentiment in a Google Cloud Storage file."""
#     client = language.LanguageServiceClient()

#     document = types.Document(
#         gcs_content_uri=gcs_uri,
#         type=enums.Document.Type.PLAIN_TEXT)

#     # Detect and send native Python encoding to receive correct word offsets.
#     encoding = enums.EncodingType.UTF32
#     if sys.maxunicode == 65535:
#         encoding = enums.EncodingType.UTF16

#     result = client.analyze_entity_sentiment(document, encoding)

#     for entity in result.entities[:10]:
#         print(u'Name: "{}"'.format(entity.name))
#         for mention in entity.mentions:
#             print(u'  Begin Offset : {}'.format(mention.text.begin_offset))
#             print(u'  Content : {}'.format(mention.text.content))
#             print(u'  Magnitude : {}'.format(mention.sentiment.magnitude))
#             print(u'  Sentiment : {}'.format(mention.sentiment.score))
#             print(u'  Type : {}'.format(mention.type))
#         print(u'Salience: {}'.format(entity.salience))
#         print(u'Sentiment: {}\n'.format(entity.sentiment))


# [START def_classify_file]
# def classify_file(gcs_uri):
#     """Classifies content categories of the text in a Google Cloud Storage
#     file.
#     """
#     client = language.LanguageServiceClient()

#     document = types.Document(
#         gcs_content_uri=gcs_uri,
#         type=enums.Document.Type.PLAIN_TEXT)

#     categories = client.classify_text(document).categories

#     for category in categories:
#         print(u'=' * 20)
#         print(u'{:<16}: {}'.format('name', category.name))
#         print(u'{:<16}: {}'.format('confidence', category.confidence))
# # [END def_classify_file]

if __name__ == '__main__':
    sentiment_file('gs://news-articles/cnn_russia.txt')