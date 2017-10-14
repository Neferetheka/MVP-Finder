var fs = require('fs');

var leagues = ['al', 'nl'];


var rankMvps = function (league) {
    var mvpFilePath = 'data/mvp_' + league + '.json';
    fs.readFile(mvpFilePath, function (err, content) {
        var mvps = JSON.parse(content);

        var battersCount = 0;
        var opsTotal = 0;
        var opsRank = 0;
        var warTotal = 0;
        var warRank = 0;
        var rcTotal = 0;
        var rcRank = 0;
        var waaTotal = 0;
        var waaRank = 0;
        var wrcTotal = 0;
        var wrcRank = 0;
        var mvpWithFirstRankedOps = 0;
        var mvpWithFirstRankedWar = 0;
        var mvpWithFirstRankedRc = 0;
        var mvpWithFirstRankedWaa = 0;
        var mvpWithFirstRankedWrc = 0;

        var catchers = 0;

        for (var i = 0; i < mvps.length; i++) {
            var mvp = mvps[i];
            if (mvp.position != "RHP" && mvp.position != "LHP") {
                battersCount++;

                opsTotal += parseFloat(mvp.ops);
                opsRank += parseInt(mvp.opsRank);
                warTotal += parseFloat(mvp.war);
                warRank += parseInt(mvp.warRank);
                rcTotal += parseFloat(mvp.rc);
                rcRank += parseInt(mvp.rcRank);
                waaTotal += parseFloat(mvp.waa);
                waaRank += parseInt(mvp.waaRank);

                wrcTotal += parseFloat(mvp.wrc);
                wrcRank += parseInt(mvp.wrcRank);

                if (mvp.opsRank == 1) {
                    mvpWithFirstRankedOps++;
                }
                if (mvp.warRank == 1) {
                    mvpWithFirstRankedWar++;
                }
                if (mvp.rcRank == 1) {
                    mvpWithFirstRankedRc++;
                }
                if (mvp.waaRank == 1) {
                    mvpWithFirstRankedWaa++;
                }

                if (mvp.wrcRank == 1) {
                    mvpWithFirstRankedWrc++;
                }
            }

            if (mvp.position == "C") {
                catchers++;
            }
        }

        var opsAverage = opsTotal / battersCount;
        var opsRankAverage = opsRank / battersCount;

        var warAverage = warTotal / battersCount;
        var warRankAverage = warRank / battersCount;

        var rcAverage = rcTotal / battersCount;
        var rcRankAverage = rcRank / battersCount;

        var waaAverage = waaTotal / battersCount;
        var waaRankAverage = waaRank / battersCount;

        var wrcAverage = wrcTotal / battersCount;
        var wrcRankAverage = wrcRank / battersCount;

        console.log("We have " + battersCount + " MVP batters");
        console.log("OPS average: " + opsAverage);
        console.log("OPS rank: " + opsRankAverage);
        console.log("MVPs ranked first in OPS: " + mvpWithFirstRankedOps + "(" + Math.floor((mvpWithFirstRankedOps / battersCount) * 100) + "%)");
        console.log("\n");
        console.log("WAR average: " + warAverage);
        console.log("WAR rank: " + warRankAverage);
        console.log("MVPs ranked first in WAR: " + mvpWithFirstRankedWar + "(" + Math.floor((mvpWithFirstRankedWar / battersCount) * 100) + "%)");
        console.log("\n");
        console.log("RC average: " + rcAverage);
        console.log("RC rank: " + rcRankAverage);
        console.log("MVPs ranked first in RC: " + mvpWithFirstRankedRc + "(" + Math.floor((mvpWithFirstRankedRc / battersCount) * 100) + "%)");
        console.log("\n");
        console.log("WAA average: " + waaAverage);
        console.log("WAA rank: " + waaRankAverage);
        console.log("MVPs ranked first in WAA: " + mvpWithFirstRankedWaa + "(" + Math.floor((mvpWithFirstRankedWaa / battersCount) * 100) + "%)");
        console.log("\n");
        console.log("wRC+ average: " + wrcAverage);
        console.log("wRC+ rank: " + wrcRankAverage);
        console.log("MVPs ranked first in wRC+: " + mvpWithFirstRankedWrc + "(" + Math.floor((mvpWithFirstRankedWrc / battersCount) * 100) + "%)");
        console.log("\n");
        console.log("There are " + catchers + " catchers among MVPs");
    });
};

rankMvps(leagues[0]);
