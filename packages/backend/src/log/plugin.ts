import getLogger from '@/log';
const logger = getLogger('GraphQL Server');
logger.level = 'debug';
const graphqlLogger = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart (requestContext) {
    logger.info('Efetuando Request');
    // console.info('EFETUANDO REQUEST');
    // console.log(requestContext.request.query);

    return {

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart (requestContext) {
        logger.info('Parseando começou');
        // console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart (requestContext) {
        logger.info('Validação começou');
        // console.log('Validation started!');
      }

    };
  }
};

export default graphqlLogger;
