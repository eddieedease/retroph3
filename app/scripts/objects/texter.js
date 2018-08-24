export default class Texter extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, x, y) {
    super(scene, 0, 0, 'texter').setScale(0.5);

    this.scene = scene;
    this.setPosition(x, y);
    this.setOrigin(0.5);

    this.missiontext = this.scene.add.bitmapText(this.x - 33, this.y - 30, 'pixelfont', 'Hello ', 10);
    this.missiontext.setDepth(1);
  }

  /**
   *  Increment the angle smoothly.
   */
  update() {
    //this.angle += 0.1;
  }
}
