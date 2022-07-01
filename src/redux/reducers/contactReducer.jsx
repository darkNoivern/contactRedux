const iniState = [
    {
        id: 0,
        name: 'keyll',
        email: 'darkmozilla@gmail.com',
        number: 7148714782,
    }
];

const contactReducer = (state=iniState,action) =>{
    switch(action.type){
        case 'ADD_CONTACT': 
            state = [...state,action.payload];
            state.forEach((contact,index)=>{
                console.log(contact.id, index)
                contact.id = index;
            })
            return state
        case 'UPDATE_CONTACT': 
            state[action.payload.id] = action.payload;
            return state
        case 'DELETE_CONTACT':
            const newState = state.filter((contact,index)=>{
                return (contact.id!==action.payload.id);
            })    
            state = newState;
            state.forEach((contact,index)=>{
                console.log(contact.id, index)
                contact.id = index;
            })
            return state
        default: return state
    }
}

export default contactReducer