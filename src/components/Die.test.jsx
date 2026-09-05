import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Die from './Die';

describe('Die Bileşeni Testleri', () => {
    test('Verilen zar yüzüne (face) göre sorunsuz render olmalı', () => {
        const { container } = render(<Die face="five" rolling={false} />);

        const dieElement = container.querySelector('.Die');
        expect(dieElement).toBeInTheDocument();
        expect(dieElement).not.toHaveClass('Die-rolling');
    });

    test('rolling prop-u true olduğunda Die-rolling sınıfı eklenmeli', () => {
        const { container } = render(<Die face="three" rolling={true} />);

        const dieElement = container.querySelector('.Die');
        expect(dieElement).toHaveClass('Die-rolling');
    });

    test('Tanımlanmamış veya hatalı face durumunda varsayılan zarı basmalı', () => {
        const { container } = render(<Die face="invalid_face" />);

        const dieElement = container.querySelector('.Die');
        expect(dieElement).toBeInTheDocument();
    });
});