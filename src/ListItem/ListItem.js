import React from 'react';
import './ListItem.css';

function ListItem(props) {
    return (
        <article className="list">
            <p className="card__paragraph" onClick={props.onClick}>
                {props.nameItem}
            </p>

        </article>
    )
}

export default ListItem;