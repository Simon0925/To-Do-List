
async function tokenVarification () {
    const token = localStorage.getItem('accessToken');
    if (!token) return console.log('no token')
    if (token) {
      try {
        const response = await fetch('http://localhost:3001/api/verify-token', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
      
        const responseData = await response.json();

        console.log('areEqual:',responseData.areEqual)
        
        if (responseData.areEqual) {
            console.log('Token is valid');
            return true
        } else {
          console.log('Token is invalid');
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


export default tokenVarification