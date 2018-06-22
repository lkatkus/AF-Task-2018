const requestQueue = []; /* Placeholder for all created requests */
const executionQueue = []; /* Placeholder for requests that are being sent */
const finishedRequests = []; /* Placeholder for requests that were sent */

let totalRequests = 100; /* Total number of requests that need to be sent */
let maxSent = 5; /* Number of request that will be sent simultaneously */

class Request{
    constructor(id){
        this.id = id;
        if(id > 5 && id < 9 || id > 45 && id < 66 || id > 88 && id < 93){
            this.priority = 'high';
        }else{
            this.priority = 'standart';
        }
    }

    sendRequest(){
        return (`Sending request with ID: ${this.id} and PRIORITY: ${this.priority}`);
    }
}

// Main function
const init = () => {
    // Creates a single request and pushes to placeholder array
    const createRequests = () => {
        return new Promise((resolve, reject) => {
            if(totalRequests > 0){
                for(let i = 0; i < totalRequests; i++){
                    // Create new request
                    let newRequest = new Request(i);

                    // Push new promise to queue
                    requestQueue.push(newRequest);

                    // Check if queue is not full
                    if(requestQueue.length === totalRequests){
                        // Sort array by priority
                        sortRequestQueue();
                        resolve();
                    }
                }
            }else{
                reject('No request were made');
            }
        });
    };

    createRequests()
        .then(() => {
            createExecutionQueue();
        })
        .then(() => {
            console.log('====== SENDING FIRST REQUEST BATCH ======');
            sendRequests();
        })
        .then(() => {
            console.log('====== ALL REQUESTS HAVE BEEN SENT ======');
            console.log(executionQueue);
            console.log(requestQueue);
            console.log(finishedRequests);
        })
        .catch((err) => {
            console.log(err);
        })
};

// Sorts requestQueue based on request priority
const sortRequestQueue = () => {
    requestQueue.sort((a, b) => {
        if(a.priority > b.priority){
            return 1;
        }
        if(a.priority < b.priority){
            return -1;
        }
        if(a.priority === b.priority){
            // For sorting requests by id if priority is the same
            if(a.id > b.id){
                return 1;
            }
            return -1;
        }
    })
};

// Creates an request execution queue array
const createExecutionQueue = () => {
    while(executionQueue.length < maxSent && requestQueue.length > 0){
        executionQueue.push(requestQueue.shift());
    }
};

// Sends all requests that are currently executionQueue
const sendRequests = () => {
    return new Promise((resolve, reject) => {
        if(executionQueue.length === maxSent && requestQueue.length >= 0){
            for(let i = 0; i < executionQueue.length; i++){
                console.log(executionQueue[i].sendRequest());
            };
            // Empty executionQueue after sending
            while(executionQueue.length > 0){
                finishedRequests.push(executionQueue.shift());
            }

            // Check if there are still requests in requestQueue
            if(requestQueue.length > 0){
                createExecutionQueue()
                console.log('====== SENDING NEXT REQUEST BATCH ======');
                sendRequests();
            }
        }else{
            // If all request from requestQueue and executionQueue have been sent, then resolve()
            resolve();
        }
    })
}