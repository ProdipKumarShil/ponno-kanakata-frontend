// This file is kept for reference but is not actively used in the JavaScript version of the project.
// In a real-world JS project, you might use JSDoc for type hinting.

/**
 * @typedef {Object} ProductVariant
 * @property {string} sku
 * @property {string} name
 * @property {string} name_bn
 * @property {number} price
 * @property {number|null} [originalPrice]
 * @property {number} stock
 * @property {number} weight
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Firestore document ID
 * @property {string} slug
 * @property {string} name
 * @property {string} name_bn
 * @property {string} description
 * @property {string} description_bn
 * @property {number} price - Base price, will be overridden by variant
 * @property {number|null} [originalPrice] - Base original price
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} images
 * @property {{name: string, name_bn: string, slug: string}} category
 * @property {string} brand
 * @property {number} stock - Base stock, will be overridden by variant
 * @property {string[]} [colors]
 * @property {string[]} [sizes]
 * @property {number} weight - in kg, base weight
 * @property {ProductVariant[]} [variants]
 * @property {boolean} [hasVariants]
 * @property {boolean} isVisible
 * @property {string[]} [tags]
 * @property {any} [createdAt] - Firestore FieldValue
 * @property {any} [updatedAt] - Firestore FieldValue
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} name_bn
 * @property {string} slug
 * @property {string|null} [parentId]
 * @property {string} [icon]
 * @property {Category[]} [subcategories]
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} text
 * @property {'customer' | 'admin'} sender
 * @property {any} timestamp - Firestore ServerTimestamp
 * @property {boolean} [read]
 * @property {string} [adminName]
 * @property {string} [adminAvatar]
 */

/**
 * @typedef {Object} ChatSession
 * @property {string} id
 * @property {any} createdAt - Firestore ServerTimestamp
 * @property {any} lastMessageTimestamp - Firestore ServerTimestamp
 * @property {string} [lastMessage]
 * @property {boolean} [hasUnreadCustomerMessage]
 * @property {boolean} [hasUnreadAdminMessage]
 * @property {any} [customerDetails]
 */

/**
 * @typedef {Object} ProductReview
 * @property {string} [id]
 * @property {string} productId
 * @property {string} [productName]
 * @property {string} userId
 * @property {string} userName
 * @property {string} [userAvatar]
 * @property {number} rating
 * @property {string} comment
 * @property {any} timestamp - Firestore ServerTimestamp
 * @property {string} [reply]
 * @property {any} [replyTimestamp]
 * @property {boolean} [isEdited]
 */

/**
 * @typedef {Object} UserRole
 * @property {string} id - email
 * @property {'owner' | 'manager' | 'editor' | 'viewer'} role
 */

/**
 * @typedef {Object} AdminActivityLog
 * @property {string} [id]
 * @property {any} timestamp - Firestore FieldValue
 * @property {string} userId - email of the admin
 * @property {'login' | 'logout' | 'create' | 'update' | 'delete'} action
 * @property {string} [collectionName]
 * @property {string} [docId]
 * @property {any} [details]
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} content
 * @property {string} [metaDescription]
 * @property {boolean} isPublished
 * @property {any} createdAt - Firestore ServerTimestamp
 * @property {any} updatedAt - Firestore ServerTimestamp
 */
