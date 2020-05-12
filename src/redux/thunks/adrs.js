import * as actionCreators from '../reducers/adrs';
import * as service from '../../Services/patientService';

const adrss = ['Vertolin', 'Smuzi', 'Salgim', 'Kek'];

const ScaleTypeResponse1 = { id: 1,
    name: 'Шкала частоты возникновения побочных реакций (5 градаций)',
    namesFromScale: ['Очень часто (более 10%)', 'Часто (от 1 до 10%)', 'Менее часто (от 0.1 до 1%)', 'Редко (от 0.01 до 0.1%)', 'Очень редко (до 0.01%)'] };

const ScaleTypeResponse2 = { id: 2,
    name: 'Шкала тяжести клинического течения (4 градации)',
    namesFromScale: ['Легкая реакция', 'Умеренная реакция', 'Тяжелая реакция', 'Смертельная реакция'] };

const adrResponse1 = { id: 1,
    name: 'Реакция 1',
    frequencyOfOccurence: 2,
    theSeverityOfTheClinicalCourse: 1,
    scaleTypeForTheSeverityOfTheClinicalCourse: ScaleTypeResponse2,
    scaleTypeForOccurenceFrequency: ScaleTypeResponse1,
    activeSubstances: ['Unknown', 'Forget'] };

const adrResponse2 = { id: 2,
    name: 'Реакция 2',
    frequencyOfOccurence: 4,
    theSeverityOfTheClinicalCourse: 3,
    scaleTypeForTheSeverityOfTheClinicalCourse: ScaleTypeResponse2,
    scaleTypeForOccurenceFrequency: ScaleTypeResponse1,
    activeSubstances: ['A', 'B'] };

const ADRS = [[adrResponse1, adrResponse2, adrResponse2], [adrResponse2], [adrResponse1], [adrResponse1]];

export const get = (id) => {
    return async dispatch => {
        if (typeof (id) == 'undefined') {
            console.log('UNDEF Id');
            const adrs = undefined;
            dispatch(actionCreators.put(adrs, -1));
        } else {
            const adrs = await service.getAdrsByMedicine(id);
            console.log('GET Adrs', adrs);
            dispatch(actionCreators.put(adrs, id));
        }
    };
};

export const clear = () => dispatch => dispatch(actionCreators.clear());
