import { SymbaroumTour } from "./SymbaroumTour.js";

export async function tourSetup()
{
    try {        
        game.symbaroum.log("Loading tours");
        const {files} = await FilePicker.browse("data", '/systems/symbaroum/tours');
        for(let i = 0; i < files.length; i++) {
            if(!files[i].endsWith(".json")) {
                console.log(`Skipping files[${i}]=${files[i]}`);
                continue;
            }
            console.log(`files[${i}]=${files[i]}`);

            let tour = await SymbaroumTour.fromJSON(files[i]);        
            game.tours.register(game.symbaroum.config.namespace,tour.id,tour);
        }
        game.symbaroum.log("Tours all set-up");
    } catch(err) {
        return console.error(`Issues with SymbaroumTour`,err);
    }
    game.symbaroum.tourLink = tourLink;
}

async function tourLink(event) {
    let header = $(event);
    // game.symbaroum.log("event",header);
    let tourId = header[0].dataset.tourId;
    if(!tourId.includes('.')) {
        tourId = `symbaroum.${ tourId}`;
    }
    let tour = game.tours.get(`symbaroum.${ header[0].dataset.tourId }`);
    tour?.start();
}