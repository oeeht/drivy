'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


//function to get the rental time in days
function getDiffDays(date1, date2)
{
   var firstDate = new Date(date1);
   var secondDate = new Date(date2);
   
   return  1 + (secondDate - firstDate) / (1000 * 3600 * 24);
}


//function to get the price of the rental
function getPrice(rentals, cars, listActors)
{
  var dayPrice = 0;
  var distancePrice = 0 ;
  var timePrice = 0;
  var comm = 0;

  //loop to get the price of each rentals
  for (var i = 0 ; i< rentals.length ; i++)
  {
    for (var j = 0 ; j < cars.length ; j++)
    {
      if(cars[j].id == rentals[i].carId)
      {
        dayPrice = cars[i].pricePerDay;
        distancePrice = cars[i].pricePerKm;
      }
    }
    var numDays = getDiffDays(rentals[i].pickupDate, rentals[i].returnDate );
    
    //conditions to have a decreasing price - exo2
    if(numDays > 10)
    {
      dayPrice = 0.5 * dayPrice;
    }
    else if((numDays> 4) && (numDays <= 10))
    {
      dayPrice = 0.7 * dayPrice;
    }
    else if((numDays > 1) && (numDays <= 4))
    {
      dayPrice = 0.9 * dayPrice;
    }

    //calculation to get the price for each rentals - exo1
    timePrice = numDays* dayPrice;
    rentals[i].price =  numDays * dayPrice + rentals[i].distance * distancePrice;

    //calculation of the commission - exo3
    comm = 0.3 * rentals[i].price;
    rentals[i].commission.insurance =  comm / 2 ; 
    rentals[i].commission.assistance =  numDays;
    rentals[i].commission.drivy =  comm - (rentals[i].commission.insurance + rentals[i].commission.assistance);
  
    //calculation of the price while deductible options is true - exo4
    var deductible = 4 * numDays;
    if(rentals[i].options.deductibleReduction == true)
    {
      rentals[i].price = rentals[i].price + deductible;
    }

    //calculation to pay the actors - exo5
    for(var l = 0; l < listActors.length; l++)
    {
      if(listActors[l].rentalId == rentals[i].id)
      {
        for(var m = 0; m < listActors[l].payment.length; m++)
        {
          switch (listActors[l].payment[m].who)
          {
            case "driver":
            listActors[l].payment[m].amount = listActors[l].payment[m].amount + rentals[i].price;
            break;
            case "owner":
            listActors[l].payment[m].amount = rentals[i].price - comm;
            break;
            case "insurance":
            listActors[l].payment[m].amount = rentals[i].commission.insurance;
            break;
            case "assistance":
            listActors[l].payment[m].amount = rentals[i].commission.assistance;
            break;
            case "drivy":
            listActors[l].payment[m].amount = rentals[i].commission.drivy + deductible;
            break;
          }
        }
      }
    } 
  }
}
getPrice(rentals, cars, actors);


console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
