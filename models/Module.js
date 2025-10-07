const db = global.db;

exports.createModule = async (userId, title, description) => {
    const docRef = await db.collection('modules').add({
        userId,
        title,
        description: description || '',
        createdAt: new Date(),
    });
    return docRef.id;
};

exports.getModulesByUser = async (userId) => {
    const snapshot = await db.collection('modules').where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.updateModule = async (moduleId, data) => {
    await db.collection('modules').doc(moduleId).update(data);
};

exports.deleteModule = async (moduleId) => {
    await db.collection('modules').doc(moduleId).delete();
};
// --- End of model ---