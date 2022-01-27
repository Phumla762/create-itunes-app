import React from 'react';

//this component is for the favourite component includign its functionality.
// what is included in the favouriteList is mapped for simpler use that the item would be included in the list along with its img and title.



export default function favouriteList(props) {

    const {favouriteList} = props;

  return <div className="container">
  <h2>Favourite List</h2>

  <div className="row-container">
  {favouriteList.map(item => {
      return(
          <div>
              <a key={item.id} href={item.link}>
                  <div className="fave-wrapper">
                      <img
                      className="favourite-img"
                      src={item.img}
                      alt={item.title}
                      />
                  </div>
              </a>
          </div>
      )
  })}
  </div>
  </div>;
}
