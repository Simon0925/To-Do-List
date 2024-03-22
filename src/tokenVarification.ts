


async function tokenVarification () {


    const token = localStorage.getItem('accessToken');
    if (!token) return null
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

       
        if (responseData.areEqual) {
            return {areEqual:true,id:responseData.userId}
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


export default tokenVarification