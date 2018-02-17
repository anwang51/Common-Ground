import httplib2
import sys

from googleapiclient import discovery
from googleapiclient.errors import HttpError

def test_language_api(content):
  discovery_url = 'https://{api}.googleapis.com/$discovery/rest?version={apiVersion}'
  service = discovery.build(
      'language', 'v1',
      http=httplib2.Http(),
      discoveryServiceUrl=discovery_url,
      developerKey="AIzaSyBZ7ud1PX9GF5ZUCrizb1HofTH_zPzAAxI",
  )

  service_request = service.documents().annotateText(
      body={
          'document': {
              'type': 'PLAIN_TEXT',
              'content': content,
          },
          'features': {
              'extract_syntax': True,
              'extractEntities': True,
              'extractDocumentSentiment': True,
          },
          'encodingType': 'UTF16' if sys.maxunicode == 65535 else 'UTF32',
      })

  try:
      response = service_request.execute()
  except HttpError as e:
      response = {'error': e}

  return response