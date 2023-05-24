export const fetchRequest = async (options = {}, urlPath) => {
    try {
        const url = 'https://todo-list-94442-default-rtdb.firebaseio.com/todos'
        const requestOptions = {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
            }

        }
        console.log(urlPath, options);
        if (options.body) {
            requestOptions.body = JSON.stringify(options.body)
        }
        if (urlPath) {
            const response = await fetch(`${url}/${urlPath}.json`, requestOptions)
            const data = await response.json()
            return data
        } else {
            const response = await fetch(`${url}.json`, requestOptions)
            const data = await response.json()
            return data
        }
        
    } catch (error) {
        new Error(error)
        console.log(error);
    }

}