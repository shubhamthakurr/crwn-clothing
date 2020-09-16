import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { firestore, coveryCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// import { updateCollections } from '../../redux/shop/shop.actions';
// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';



// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount(){
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render(){
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact 
                    path={`${match.path}`} 
                     
                    component={CollectionsOverviewContainer}
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => 
    //     dispatch(updateCollections(collectionsMap))
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
   
export default connect(null, mapDispatchToProps)(ShopPage);