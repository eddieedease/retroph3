

export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image'
        }, {
          key: 'progress-bar',
          type: 'image'
        }]
      }
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();

    // camera pipeline
    // customPipeline2 = this.game.renderer.addPipeline('Custom2', new CustomPipeline2(this.game));


    //  HINT: Declare all game assets to be loaded here.
    // this.load.image('logo');
    this.load.image('bg', 'space1.png');
    this.load.image('particle', 'yellow.png');
    this.load.image('logo', 'phaser2.png');

    //this.load.image('picA', 'assets/pics/lance-overdose-loader-eye.png');
    // tilemap json
    this.load.image('tiles', 'maps/tilesetextruded.png');
    this.load.image('tiles2', 'maps/tileset2extruded.png');
    // this.load.image('tilesoutside', 'maps/roguelike_outside.png');

    // ppixelfont
    this.load.bitmapFont('pixelfont', 'fonts/font.png', 'fonts/font.fnt');

    this.load.tilemapTiledJSON({
      key: 'tileset',
      url: 'maps/tileset.json'
    });

    this.load.spritesheet('cat', 'sprites/cat.png', {
      frameWidth: 40,
      frameHeight: 60
    });

    this.load.spritesheet('player', 'sprites/charsheet.png', {
      frameWidth: 45,
      frameHeight: 59
    });

    this.load.spritesheet('npc', 'sprites/npc.png', {
      frameWidth: 26,
      frameHeight: 36
    });



    // mball
    this.load.image('mball', 'img/mball.png');
     // texter
     this.load.image('texter', 'img/textcloud.png');
     // gameover screen
     this.load.image('gameover', 'img/gameover.png');
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    this.scene.start('Game');

    
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {
      width: w,
      height: h
    } = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(100, 350, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  } 
}





 