import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API documentation for User Management System',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated MongoDB ObjectId',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address (must be unique)',
                            example: 'john.doe@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            default: 18,
                            example: 25
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when user was created'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when user was last updated'
                        }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.doe@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 25
                        }
                    }
                },
                UserUpdateInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe Updated'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'john.updated@example.com'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 30
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        message: {
                            type: 'string',
                            example: 'Operation completed successfully'
                        }
                    }
                },
                UsersListResponse: {
                    type: 'object',
                    properties: {
                        users: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/User'
                            }
                        },
                        message: {
                            type: 'string',
                            example: 'Users retrieved successfully'
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                            example: 'An error occurred'
                        }
                    }
                },
                NotFoundError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'User not found'
                        }
                    }
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation failed'
                        }
                    }
                },
                ServerError: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Internal server error'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
