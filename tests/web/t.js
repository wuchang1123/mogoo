VTPL["tests/web/t"] = [
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "d8",
        "leader": "$"
      },
      {
        "type": "integer",
        "value": "0"
      }
    ]
  },
  "\n\n",
  {
    "type": "macro",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "somelist",
        "leader": "$"
      }
    ]
  },
  "\n  ",
  {
    "type": "foreach",
    "to": "something",
    "from": {
      "type": "references",
      "id": "somelist",
      "leader": "$"
    }
  },
  "\n    <tr><td bgcolor=",
  {
    "type": "references",
    "id": "color",
    "leader": "$"
  },
  ">",
  {
    "type": "references",
    "id": "something",
    "leader": "$"
  },
  "<",
  "/td></tr>\n  ",
  {
    "type": "end"
  },
  "\n",
  {
    "type": "end"
  },
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "greatlakes",
        "leader": "$"
      },
      {
        "type": "array",
        "value": [
          {
            "type": "string",
            "value": "Superior",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Michigan",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Huron",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Erie",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Ontario",
            "isEval": true
          }
        ]
      }
    ]
  },
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "string",
        "value": "blue",
        "isEval": true
      }
    ]
  },
  "\n<table>\n  ",
  {
    "type": "macro_call",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "greatlakes",
        "leader": "$"
      }
    ]
  },
  "\n</table>\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "parts",
        "leader": "$"
      },
      {
        "type": "array",
        "value": [
          {
            "type": "string",
            "value": "volva",
            "isEval": true
          },
          {
            "type": "string",
            "value": "stipe",
            "isEval": true
          },
          {
            "type": "string",
            "value": "annulus",
            "isEval": true
          },
          {
            "type": "string",
            "value": "gills",
            "isEval": true
          },
          {
            "type": "string",
            "value": "pileus",
            "isEval": true
          }
        ]
      }
    ]
  },
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "cellbgcol",
        "leader": "$"
      },
      {
        "type": "string",
        "value": "#CC00FF",
        "isEval": true
      }
    ]
  },
  "\n<table>\n  ",
  {
    "type": "macro_call",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "cellbgcol",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "parts",
        "leader": "$"
      }
    ]
  },
  "\n</table>"
];
