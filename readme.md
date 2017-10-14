# MVP Finder

This project has been made to study the impact of batter stats on MVP selection. It was created in the context of a research project for SABR.
It's separated in three parts:

* parser.js: used to convert data from CSV format to JSON. It generates a _mvp_al.json_ and a _mvp_nl.json_ file, containing the rank of all MVP players regarding stats like OPS, WAR, RC, WAA and WRC.
* index.js: used to generate some stats about MVP players, like the average WAR among them.
* html folder: contains a _charts.html_ file, which is basically the graphic representation of data generated with the parser. The _gfx_ folder contains screenshots of the charts for reference.
