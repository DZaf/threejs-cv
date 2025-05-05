import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import Sidebar from '../src/sidebar';

describe('Sidebar component', () => {
    it('renders UI Controls header and buttons', () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );

        expect(screen.getByText('UI Controls')).toBeInTheDocument();
        expect(screen.getByText(/Toggle Helpers/i)).toBeInTheDocument();
        expect(screen.getByText('Planets')).toBeInTheDocument();
    });

    it('displays loading text if no planets are loaded', () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
