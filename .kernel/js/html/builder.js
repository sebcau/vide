/**
 * Librairie gérant la création d'element HTML.
 * 
 * @author Thibault Bustos (TheRake66)
 * @version 1.0.0.0
 * @category Framework source
 * @license MIT License
 * @copyright © 2021-2023 - Thibault BUSTOS (TheRake66)
 */
export default class Builder {

    /**
     * Crée un élément HTML.
     * 
     * @param {string} tag Le tag de l'élément.
     * @param {Object} attr Les attributs de l'élément.
     * @param {HTMLElement|Array} content Le contenu de l'élément.
     * @returns {HTMLElement} L'élément créé.
     */
    static create(tag, attr = null, content = null) {
        let el = document.createElement(tag);
        if (attr) {
            for (let key in attr) {
                el[key] = attr[key];
            }
        }
        if (content) {
            if (Array.isArray(content)) {
                content.forEach(element => {
                    el.append(element);
                });
            } else {
                el.append(content);
            }
        }
        return el;
    }

    
    /**
     * Crée un élément HTML à partir d'une chaine de caractère HTML.
     * 
     * @param {string} html La chaine de caractère HTML.
     * @returns {HTMLElement} L'élément créé.
     */
    static parse(html) {
        let el = document.createElement('div');
        el.innerHTML = html;
        return el.firstElementChild;
    }
    
}