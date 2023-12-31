import Thread from '../io/thread.js';



/**
 * Librairie de gestion des sons.
 * 
 * @author Thibault Bustos (TheRake66)
 * @version 1.0.0.0
 * @category Framework source
 * @license MIT License
 * @copyright © 2021-2023 - Thibault BUSTOS (TheRake66)
 */
export default class Sound {

    /**
	 * Lis un fichier audio et le joue.
	 * 
     * @param {string|Audio} track Le chemin du fichier audio ou l'objet Audio.
     * @param {Number} volume Le volume du son entre 0 et 1.
     * @param {boolean} loop Si le son doit être joué en boucle.
     * @param {function} onSuccess La fonction à appeler si le son a été joué.
     * @param {function} onError La fonction à appeler si le son n'a pas pu être joué.
     * @param {function} onEnd La fonction à appeler quand le son est terminé.
     * @param {Number} timeout Le temps avant chaque tentative de lecture du son.
     * @return {void}
     */
    static async play(track, volume = 1, loop = false, onSuccess = null, onError = null, onEnd = null, timeout = 500) {
        if (typeof track === 'string') {
            track = new Audio(track);
        }
        track.volume = volume;
		track.addEventListener('ended', function() {
			if (onEnd) onEnd();
			if (loop) {
				track.currentTime = 0;
				track.play();
			}
		}, false);
		let out = false;
		do {
			track
				.play()
				.then(_ => {
					out = true;
					if (onSuccess) onSuccess();
				})
				.catch(e => {
					if (onError) {
						out = true;
						onError(e);
					}
				});
			if (!out) {
				await Thread.sleep(timeout);
			}
		} while (!out)
    }

}