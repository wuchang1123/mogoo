VTPL["tests/web/macro"] = [
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
  }
];
