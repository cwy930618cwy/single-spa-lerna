let state = {
    name: 'zs'
}

export function startListen() {
    listenLogout();
}


function listenLogout() {
    window.vm.$on('addName', (val)=>{
        console.log('nm-----', val)
        state.name = val
    })
}

export const states = state