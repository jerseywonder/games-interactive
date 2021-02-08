export default function match_array(a, b) {

    // array matches
    if (Array.isArray(b)) {

        var filteredArray = b.filter(function( c ) {
            if (a.indexOf(c) > -1) {
                return c;
            }
        });

        return filteredArray

    }

    // string match
    return  (a.indexOf(b) > -1) ? b : [] ;

}