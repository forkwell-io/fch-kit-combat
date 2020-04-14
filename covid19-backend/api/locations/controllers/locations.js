'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const geodist = require('geodist');

module.exports = {
    updateUserLocation: async ctx => {
        let userId = ctx.params.id;
        
        let infectedUser = await strapi.query('user', 'users-permissions').find({id: userId})
        let allUsers = await strapi.plugins['users-permissions'].services.user.fetchAll();

        let infectedUserCoordinate = infectedUser[0].locations[0].coordinate;
        let infectionProximity = [];

        await allUsers.forEach(el => {
            if(el.locations.length > 0) {
                let rawData = geodist(infectedUserCoordinate, el.locations[0].coordinate, {exact: true, unit: 'km'});
                let calculatedData = Math.ceil(rawData * 1000); //convert to KM

                if (calculatedData < 1000 && calculatedData != 0) {
                    strapi
                        .query('user', 'users-permissions')
                        .update({_id: el._id}, {
                            hasBeenInCloseProximity: true
                        })
                    
                    infectionProximity.push({
                        _id: el._id,
                        proximity: calculatedData,
                        fullName: el.firstName + ' ' + el.lastName,
                        phoneNo: el.phoneNo,
                        underObservation: el.underObservation,
                        isCovidPositive: el.isCovidPositive,
                        lastKnownLocation: el.locations[el.locations.length - 1],
                        hasBeenInCloseProximity: el.hasBeenInCloseProximity
                    })
                }
            }
        });

        return infectionProximity
    }
};
