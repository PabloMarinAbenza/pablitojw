let endState = {
    create: createEnd
};

function createEnd() {
    game.stage.backgroundColor = "#006633";

    let msg1 = game.add.text(0, 0, 'Last score:',
              {font:'24px Arial', fill:'#FFFF00',
               boundsAlignH:'center', boundsAlignV:'bottom'});
    msg1.setTextBounds(0, 0, game.world.width, game.world.height/2-5);

    let msg2 = game.add.text(0, 0, score,
               {font:'72px Arial', fill:'#DD8800',
                boundsAlignH:'center', boundsAlignV:'top'});
    msg2.setTextBounds(0, game.world.height/2+5, game.world.width, game.world.height/2-5);
}
