function idGen (data, cb){

  try {

    const ids = data.map(item => item.id);
    let idsObj = {};

    ids.forEach((id)=> {
      if(!idsObj[id]){
        idsObj[id] = true;
      }
    });


    for (let i = 0; i < ids.length * 2; i++) {
      if(!idsObj[i+1]){
        cb(null, i+1);
        break;
      }

    }

  } catch (error) {
    cb(error);
  }
}

export {idGen};
