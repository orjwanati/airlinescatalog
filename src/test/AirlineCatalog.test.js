import { configure,  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import AirlineCatalog from '../components/AirlineCatalog';
import data from './data';

configure({ adapter: new Adapter() });

describe('Airline Catalog Test', () => {

    it('Loading Page', () => {
        const component  = shallow(
            <AirlineCatalog loading={true} error={null} airlineList={[]}/>
        ) 
        expect(component.find('LoadingPage').length).toBeGreaterThan(0);
    })

    it('Error Page', () => {
        const component  = shallow(
            <AirlineCatalog loading={false} error={{msg:"Test Error"}} airlineList={[]}/>
        ) 
        expect(component.find('ErrorPage').length).toBe(1);
    })


    it('Airline List', () => {
        const component  = shallow(
            <AirlineCatalog loading={false} error={null} airlineList={[data[0]]}/>
        ) 
        expect(component.find('AutoSizer').length).toBe(1);
    })

  
  

})