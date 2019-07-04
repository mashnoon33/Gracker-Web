export const toggle = (boolean) => {
    return (dispatch) => {
        console.log('this fired');

        if (boolean) {
            dispatch({ type: 'TURN_ON' });
        }
        else {
            dispatch({ type: 'TURN_OFF' });
        }
       
            
    }
};
