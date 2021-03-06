import React from 'react'
import {withRouter} from "react-router-dom";
import itemsImages from "../../files/itemsImages";
import styled from "styled-components";
import {connect} from "react-redux";

const RuneImage = styled.img({
    width: 30,
    height: 30
});

class AbilityListItem extends React.Component {
    handleDetail = () => {
        this.props.history.push('/abilities/' + this.props.data.id)
    };

    render() {
        const {id, name, category, mana, passive, generalCategory, desc, cool} = this.props.data;
        const hideDescription = category !== 'Enemy' ? 'hide-on-med-and-down' : '';

        return (
            <tr key={id} onClick={this.handleDetail}>
                <td>{name}</td>
                {!passive && generalCategory !== 'Enemy Skills' && <td>{mana}</td>}
                <td className={hideDescription}>{desc}</td>
                {generalCategory === 'Enemy Skills' && <td>{cool ? cool + 's' : undefined}</td>}
                {['Passive Skills', 'Condition Skills'].includes(generalCategory) && this.props.rune && <td><RuneImage src={itemsImages[this.props.rune.name]} alt={name}/></td>}
            </tr>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        rune: state.runes.find(rune => rune.ability === ownProps.data.id)
    }
};

export default connect(mapStateToProps)(withRouter(AbilityListItem))
