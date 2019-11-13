export default class Likes{
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1)
    }
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes() {
        return this.likes.length;
    }
}



   
// export default class Likes {
//     constructor() {
//         this.likes = [];
//     }
    
// export default class Likes{
//      constructor() {
//          this.likes = [];
//     }

//     // addLike(id, title, author, img) {
//     //     const like = { id, title, author, img };
//     //     this.likes.push(like);
//     //     return like;
//     //}

//    addLike(id, title, author, img) {
//          const like = { id, title, author, img };
//          this.likes.push(like);
//          return like;
//     }     

//         // Perist data in localStorage
//         // this.persistData();


//     // deleteLike(id) {
//     //     const index = this.likes.findIndex(el => el.id === id);
//     //     this.likes.splice(index, 1);

//     //     // Perist data in localStorage
//     //     // this.persistData();
//     // }
//     deleteLike(id) {
//          const index = this.likes.findIndex(el => el.id === id)
//          this.likes.splice(index, 1)
//     }

//     // isLiked(id) {
//     //     return this.likes.findIndex(el => el.id === id) !== -1;
//     // }
//    isLiked(id) {
//         return this.likes.findIndex(el => el.id === id) !== -1;
//     }

//     getNumLikes() {
//         return this.likes.length;
//     }

// //     persistData() {
// //         localStorage.setItem('likes', JSON.stringify(this.likes));
// //     }

// //     readStorage() {
// //         const storage = JSON.parse(localStorage.getItem('likes'));
        
// //         // Restoring likes from the localStorage
// //         if (storage) this.likes = storage;
// //     }
//  }