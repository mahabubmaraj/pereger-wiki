import React from 'react'
import {connect} from 'react-redux'

import AbilityListItem from './AbilityListItem'

class AbilityList extends React.Component {
    render() {
        if (this.props.items) {
            const allAbilities = {
                data: [
                    {
                        type: 'Active Skills', items: this.props.items.filter(ability => {
                            return ability.generalCategory === "Active Skills"
                        })
                    },
                    {
                        type: 'Passive Skills', items: this.props.items.filter(ability => {
                            return ability.generalCategory === "Passive Skills"
                        })
                    },
                    {
                        type: 'Condition Skills', items: this.props.items.filter(ability => {
                            return ability.generalCategory === "Condition Skills"
                        })
                    },
                    {
                        type: 'Enemy Skills', items: this.props.items.filter(ability => {
                            return ability.generalCategory === "Enemy Skills"
                        })
                    }
                ]
            };

            const tables = allAbilities.data.map(category => {
                const responsiveTable = category.type !== 'Enemy Skills' ? 'responsive-table' : '';
                const hideDescription = category.type !== 'Enemy Skills' ? 'hide-on-med-and-down' : '';
                return (
                    <div key={category.type}>
                        <h5>{category.type}</h5>
                        <table className={'highlight ' + responsiveTable}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                {category.type !== 'Enemy Skills' && <th>Category</th>}
                                {category.type !== 'Enemy Skills' && category.type !== 'Active Skills' && <th>Per Level</th>}
                                {category.type === 'Active Skills' && category !== 'Enemy Skills' && <th>Mana</th>}
                                {category.type !== 'Active Skills' && category.type !== 'Enemy Skills' && <th>Passive?</th>}
                                <th className={hideDescription}>Description</th>
                                {category.type !== 'Enemy Skills' && <th>Equipment</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {category.items.map(ability => {
                                return (<AbilityListItem key={ability.id} data={ability}/>)
                            })}
                            </tbody>
                        </table>
                    </div>
                )
            });

            return (
                <div>
                    <h4 className="center">Abilities</h4>
                    {tables}
                </div>
            )
        }
        return (
            <div>
                <h4>Loading abilities...</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
};

export default connect(mapStateToProps)(AbilityList)