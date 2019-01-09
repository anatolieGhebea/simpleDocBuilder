'use strict';

module.exports = {
    /**
     * Returns a numeric id based on current date
     */
    getNewNumericId(){
        return Math.floor(new Date().getTime()/1000);
    }
}