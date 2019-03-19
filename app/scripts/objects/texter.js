export default class Texter extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, x, y) {
    super(scene, 0, 0, 'texter').setScale(0.45);

    this.scene = scene;
    this.setPosition(x, y);
    w
    this.setOrigin(0.5);
    this.missiontext = this.scene.add.bitmapText(this.x - 33, this.y - 25, 'pixelfont', 's\nOks ', 6);
    this.missiontext.setDepth(1);
  }

  /**
   *  Increment the angle smoothly.
   */
  update() {
    //this.angle += 0.1;
  }

  // I want to call this function from an parent
  updateText(posp_x, posp_y,_text){
    this.setAlpha(1);
    this.missiontext.setAlpha(1);
    // update position
    // update Text
    this.setPosition(posp_x + 34, posp_y - 55);
    this.missiontext.setPosition(this.x - 30 , this.y -25 );
    this.missiontext.text = _text;
  }

   // I want to call this function from an parent
   hideTexter(){
    // update position
    // update Text
    this.setAlpha(0);
    this.missiontext.setAlpha(0);
  }
}
